import { useSyncExternalStore, type AnchorHTMLAttributes } from 'react'

// Minimal History API router: shared by Header, Footer and every page.
const subscribe = (cb: () => void) => {
  window.addEventListener('popstate', cb)
  return () => window.removeEventListener('popstate', cb)
}

export const usePath = () => useSyncExternalStore(subscribe, () => window.location.pathname)

export function navigate(to: string) {
  if (to === window.location.pathname) return window.scrollTo({ top: 0, behavior: 'smooth' })
  window.history.pushState(null, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0 })
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

export function Link({ to, onClick, ...rest }: LinkProps) {
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || !to.startsWith('/')) return
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    />
  )
}
