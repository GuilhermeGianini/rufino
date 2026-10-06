import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react'

/**
 * Divide o texto de um título em palavras para a animação de entrada.
 * Mantém elementos internos como <em>. A animação acontece quando um
 * ancestral (normalmente <Reveal>) recebe data-visible="true".
 */
export function Split({ children }: { children: ReactNode }) {
  let i = 0
  const walk = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === 'string') {
        return child.split(/(\s+)/).map((part, k) => {
          if (!part || /^\s+$/.test(part)) return part
          return (
            <span key={k} className="w">
              <span style={{ '--w': i++ } as CSSProperties}>{part}</span>
            </span>
          )
        })
      }
      if (isValidElement(child)) {
        const el = child as ReactElement<{ children?: ReactNode }>
        return cloneElement(el, undefined, walk(el.props.children))
      }
      return child
    })
  return <>{walk(children)}</>
}
