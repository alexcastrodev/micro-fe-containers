import { Component, type ReactNode } from 'react'
import { RemoteUnavailableError, resetRemote } from '../mf-runtime-plugin'

type Props = {
  name: string
  children: ReactNode
  onReset?: () => void
  resetKey?: unknown
}
type State = { error: Error | null }

export class RemoteErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidUpdate(prev: Props) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null })
    }
  }

  componentDidCatch(error: Error) {
    console.error(`[RemoteErrorBoundary:${this.props.name}]`, error)
  }

  handleRetry = () => {
    const { error } = this.state
    const reset = (() => {
      if (error instanceof RemoteUnavailableError) {
        return Promise.resolve(resetRemote(error.remoteId)).catch((err) =>
          console.error('[mf] resetRemote failed:', err),
        )
      }
      return Promise.resolve()
    })()
    void reset.then(() => {
      this.setState({ error: null })
      this.props.onReset?.()
    })
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
        <p className="font-medium">O módulo "{this.props.name}" está indisponível.</p>
        <p className="mt-1 text-red-600">
          Os outros módulos continuam funcionando. Tente novamente quando o serviço voltar.
        </p>
        <button
          onClick={this.handleRetry}
          className="mt-3 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          Tentar novamente
        </button>
      </div>
    )
  }
}
