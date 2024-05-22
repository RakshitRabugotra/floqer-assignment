// Icon dependencies
import { GoLinkExternal } from 'react-icons/go'

export default function Anchor(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a {...props} className='external-link'>
      {props.children}
      <span>
        <GoLinkExternal />
      </span>
    </a>
  )
}
