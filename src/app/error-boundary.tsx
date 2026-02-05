import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: Readonly<State> = { hasError: false };

  static getStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('App error:', error);
    console.log('App errorInfo:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так 😢</h1>;
    }

    return this.props.children;
  }
}
