import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterForm } from './newsletter-form'
import { subscribeToNewsletter } from '@/lib/api'

// Mock the API module
jest.mock('@/lib/api', () => ({
  subscribeToNewsletter: jest.fn(),
}))

// Mock the NewsletterConsentModal component
jest.mock('@/components/newsletter/newsletter-consent-modal', () => ({
  NewsletterConsentModal: ({ open, onOpenChange, onConfirm }: any) => (
    <div data-testid="consent-modal" data-open={open}>
      {open && (
        <>
          <button data-testid="modal-cancel" onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button data-testid="modal-confirm" onClick={onConfirm}>
            I agree, subscribe me
          </button>
        </>
      )}
    </div>
  ),
}))

describe('NewsletterForm', () => {
  const mockSubscribeToNewsletter = subscribeToNewsletter as jest.MockedFunction<typeof subscribeToNewsletter>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Form Rendering', () => {
    it('should render email input and subscribe button', () => {
      render(<NewsletterForm />)
      
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
    })

    it('should render privacy policy and terms links', () => {
      render(<NewsletterForm />)
      
      const privacyLink = screen.getByRole('link', { name: /privacy policy/i })
      const termsLink = screen.getByRole('link', { name: /terms/i })
      
      expect(privacyLink).toBeInTheDocument()
      expect(privacyLink).toHaveAttribute('href', '/privacy')
      expect(termsLink).toBeInTheDocument()
      expect(termsLink).toHaveAttribute('href', '/terms')
    })
  })

  describe('Form Submission Flow', () => {
    it('should open NewsletterConsentModal upon form submission', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)
      
      const emailInput = screen.getByLabelText(/email address/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })
      
      // Type email
      await user.type(emailInput, 'test@example.com')
      
      // Submit form
      await user.click(submitButton)
      
      // Modal should be open
      const modal = screen.getByTestId('consent-modal')
      expect(modal).toHaveAttribute('data-open', 'true')
    })

    it('should not call subscription API before consent is confirmed', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)
      
      const emailInput = screen.getByLabelText(/email address/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)
      
      // API should not be called yet
      expect(mockSubscribeToNewsletter).not.toHaveBeenCalled()
    })

    it('should call subscription API only after consent is confirmed', async () => {
      const user = userEvent.setup()
      mockSubscribeToNewsletter.mockResolvedValue({
        success: true,
        message: 'Successfully subscribed!',
      })
      
      render(<NewsletterForm />)
      
      const emailInput = screen.getByLabelText(/email address/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })
      
      // Type email and submit
      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)
      
      // Confirm in modal
      const confirmButton = screen.getByTestId('modal-confirm')
      await user.click(confirmButton)
      
      // API should be called with correct email
      await waitFor(() => {
        expect(mockSubscribeToNewsletter).toHaveBeenCalledTimes(1)
        expect(mockSubscribeToNewsletter).toHaveBeenCalledWith('test@example.com')
      })
    })
  })

  describe('Subscription Success', () => {
    it('should display success message when subscription succeeds', async () => {
      const user = userEvent.setup()
      mockSubscribeToNewsletter.mockResolvedValue({
        success: true,
        message: 'Thank you for subscribing!',
      })
      
      render(<NewsletterForm />)
      
      const emailInput = screen.getByLabelText(/email address/i)
      await user.type(emailInput, 'test@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))
      await user.click(screen.getByTestId('modal-confirm'))
      
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Thank you for subscribing!')
      })
    })

    it('should clear email input after successful subscription', async () => {
      const user = userEvent.setup()
      mockSubscribeToNewsletter.mockResolvedValue({
        success: true,
        message: 'Successfully subscribed!',
      })
      
      render(<NewsletterForm />)
      
      const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
      await user.type(emailInput, 'test@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))
      await user.click(screen.getByTestId('modal-confirm'))
      
      await waitFor(() => {
        expect(emailInput.value).toBe('')
      })
    })

    it('should close modal after successful subscription', async () => {
      const user = userEvent.setup()
      mockSubscribeToNewsletter.mockResolvedValue({
        success: true,
        message: 'Successfully subscribed!',
      })
      
      render(<NewsletterForm />)
      
      await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))
      await user.click(screen.getByTestId('modal-confirm'))
      
      await waitFor(() => {
        const modal = screen.getByTestId('consent-modal')
        expect(modal).toHaveAttribute('data-open', 'false')
      })
    })
  })

  describe('Subscription Error Handling', () => {
    it('should display error message when subscription fails', async () => {
      const user = userEvent.setup()
      mockSubscribeToNewsletter.mockResolvedValue({
        success: false,
        message: 'Email already subscribed',
      })
      
      render(<NewsletterForm />)
      
      await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))
      await user.click(screen.getByTestId('modal-confirm'))
      
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Email already subscribed')
      })
    })

    it('should display network error message when API call fails', async () => {
      const user = userEvent.setup()
      mockSubscribeToNewsletter.mockRejectedValue(new Error('Network error'))
      
      render(<NewsletterForm />)
      
      await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))
      await user.click(screen.getByTestId('modal-confirm'))
      
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Network error. Please try again later.')
      })
    })

    it('should not clear email input when subscription fails', async () => {
      const user = userEvent.setup()
      mockSubscribeToNewsletter.mockResolvedValue({
        success: false,
        message: 'Something went wrong',
      })
      
      render(<NewsletterForm />)
      
      const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
      await user.type(emailInput, 'test@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))
      await user.click(screen.getByTestId('modal-confirm'))
      
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })
      
      expect(emailInput.value).toBe('test@example.com')
    })
  })

  describe('Loading State', () => {
    it('should show loading state during subscription', async () => {
      const user = userEvent.setup()
      let resolvePromise: (value: any) => void
      const promise = new Promise((resolve) => {
        resolvePromise = resolve
      })
      mockSubscribeToNewsletter.mockReturnValue(promise as any)
      
      render(<NewsletterForm />)
      
      await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))
      await user.click(screen.getByTestId('modal-confirm'))
      
      // Check for loading state
      await waitFor(() => {
        expect(screen.getByText(/subscribing/i)).toBeInTheDocument()
      })
      
      // Resolve the promise
      resolvePromise!({ success: true, message: 'Success' })
    })

    it('should disable submit button during loading', async () => {
      const user = userEvent.setup()
      let resolvePromise: (value: any) => void
      const promise = new Promise((resolve) => {
        resolvePromise = resolve
      })
      mockSubscribeToNewsletter.mockReturnValue(promise as any)
      
      render(<NewsletterForm />)
      
      await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
      const submitButton = screen.getByRole('button', { name: /subscribe/i })
      await user.click(submitButton)
      await user.click(screen.getByTestId('modal-confirm'))
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /subscribing/i })).toBeDisabled()
      })
      
      resolvePromise!({ success: true, message: 'Success' })
    })
  })

  describe('Modal Cancellation', () => {
    it('should not call API when modal is cancelled', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)
      
      await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))
      
      // Cancel modal
      await user.click(screen.getByTestId('modal-cancel'))
      
      expect(mockSubscribeToNewsletter).not.toHaveBeenCalled()
    })

    it('should close modal when cancelled', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)
      
      await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))
      
      await user.click(screen.getByTestId('modal-cancel'))
      
      const modal = screen.getByTestId('consent-modal')
      expect(modal).toHaveAttribute('data-open', 'false')
    })
  })
})
