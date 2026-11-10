import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Keeps an optional, decorative subtree (the 3D hero, its environment map)
 * from taking the whole page down when it fails, e.g. WebGL is unavailable
 * or a remote asset is blocked.
 */
export default class SilentErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Decorative content failed to render:", error);
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
