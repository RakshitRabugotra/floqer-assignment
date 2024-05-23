// Icon dependencies
import { GoLinkExternal } from 'react-icons/go'

export default function Anchor(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a {...props} className='text-teal-400 underline underline-offset-2'>
      {props.children}
      <span className='m-auto inline-block'>
        <GoLinkExternal />
      </span>
    </a>
  )
}
