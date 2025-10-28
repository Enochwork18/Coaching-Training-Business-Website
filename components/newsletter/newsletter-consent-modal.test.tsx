import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterConsentModal } from './newsletter-consent-modal'

describe('NewsletterConsentModal', () => {
  const mockOnOpenChange = jest.fn()
  const mockOnConfirm = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Modal Rendering', () => {
    it('should render modal when open prop is true', () => {
      render(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      expect(screen.getByText('Confirm subscription')).toBeInTheDocument()
    })

    it('should not render modal content when open prop is false', () => {
      render(
        <NewsletterConsentModal
          open={false}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      expect(screen.queryByText('Confirm subscription')).not.toBeInTheDocument()
    })

    it('should render privacy policy and terms links', () => {
      render(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      const privacyLink = screen.getByRole('link', { name: /privacy policy/i })
      const termsLink = screen.getByRole('link', { name: /terms of service/i })

      expect(privacyLink).toBeInTheDocument()
      expect(privacyLink).toHaveAttribute('href', '/privacy')
      expect(privacyLink).toHaveAttribute('target', '_blank')
      expect(privacyLink).toHaveAttribute('rel', 'noreferrer')

      expect(termsLink).toBeInTheDocument()
      expect(termsLink).toHaveAttribute('href', '/terms')
      expect(termsLink).toHaveAttribute('target', '_blank')
      expect(termsLink).toHaveAttribute('rel', 'noreferrer')
    })

    it('should render cancel and confirm buttons', () => {
      render(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /i agree, subscribe me/i })).toBeInTheDocument()
    })
  })

  describe('Modal Interactions', () => {
    it('should call onConfirm when confirmation button is clicked', async () => {
      const user = userEvent.setup()
      render(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      const confirmButton = screen.getByRole('button', { name: /i agree, subscribe me/i })
      await user.click(confirmButton)

      expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    })

    it('should call onOpenChange with false when cancel button is clicked', async () => {
      const user = userEvent.setup()
      render(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      const cancelButton = screen.getByRole('button', { name: /cancel/i })
      await user.click(cancelButton)

      expect(mockOnOpenChange).toHaveBeenCalledWith(false)
      expect(mockOnConfirm).not.toHaveBeenCalled()
    })

    it('should not call onConfirm when cancel button is clicked', async () => {
      const user = userEvent.setup()
      render(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      await user.click(screen.getByRole('button', { name: /cancel/i }))

      expect(mockOnConfirm).not.toHaveBeenCalled()
    })
  })

  describe('Modal Content', () => {
    it('should display subscription confirmation message', () => {
      render(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      expect(screen.getByText(/by subscribing, you accept our/i)).toBeInTheDocument()
    })

    it('should have proper modal title', () => {
      render(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      const title = screen.getByText('Confirm subscription')
      expect(title).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have alertdialog role', () => {
      render(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    })

    it('should have accessible links with noreferrer', () => {
      render(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noreferrer')
      })
    })
  })

  describe('Modal State Management', () => {
    it('should respond to open prop changes', () => {
      const { rerender } = render(
        <NewsletterConsentModal
          open={false}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      expect(screen.queryByText('Confirm subscription')).not.toBeInTheDocument()

      rerender(
        <NewsletterConsentModal
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      )

      expect(screen.getByText('Confirm subscription')).toBeInTheDocument()
    })
  })
})
