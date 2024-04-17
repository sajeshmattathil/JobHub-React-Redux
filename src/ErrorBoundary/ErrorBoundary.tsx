import{ Component, ReactNode, ErrorInfo } from 'react';
import logo from '/logo2.jpg'

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{height:'130vh',width:'30%',fontSize:'2rem',marginLeft:'30%',borderRadius:'10px'}}>Something went wrong{logo}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

