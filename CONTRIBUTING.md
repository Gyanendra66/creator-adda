# Contributing to Creator Adda

Thank you for your interest in contributing to Creator Adda! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/Gyanendra66/creator-adda/issues)
2. If not, open a new issue with:
   - A clear, descriptive title
   - Steps to reproduce the behavior
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Your environment (OS, browser, Node version)

### Suggesting Features

1. Open a new issue with the **feature request** label
2. Describe the feature and why it would be useful
3. Include mockups or examples if possible

### Submitting Code

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/creator-adda.git
   cd creator-adda
   ```
3. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Make your changes** and test them locally:
   ```bash
   npm run dev
   ```
6. **Build** to ensure there are no TypeScript errors:
   ```bash
   npm run build
   ```
7. **Commit** your changes with a clear message:
   ```bash
   git commit -m "Add: brief description of your change"
   ```
8. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
9. **Open a Pull Request** against the `main` branch

## Development Guidelines

### Code Style

- Use **TypeScript** for all new files
- Follow existing code patterns and naming conventions
- Use **functional components** with React hooks
- Use **Tailwind CSS** for styling — avoid inline styles or CSS modules
- Keep components small and focused

### Commit Messages

Use clear, descriptive commit messages:
- `Add: new creator filter component`
- `Fix: navbar dropdown not closing on mobile`
- `Update: improve hero section animation performance`
- `Remove: unused dependencies`

### Branch Naming

- `feature/description` — for new features
- `fix/description` — for bug fixes
- `docs/description` — for documentation changes
- `refactor/description` — for code refactoring

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing. We are committed to providing a welcoming and inclusive experience for everyone.

## Questions?

Feel free to open an issue or reach out to the maintainer at gyanendrasingh1066@gmail.com.

Thank you for helping make Creator Adda better!
