# Contributing Guide

Thank you for your interest in contributing to the AI Media Processing Platform! This guide will help you get started with contributing to the project.

## 🤝 How to Contribute

There are many ways to contribute to this project:

- 🐛 **Report bugs** - Help us identify and fix issues
- 💡 **Suggest features** - Share ideas for new functionality
- 📖 **Improve documentation** - Help make our docs better
- 🔧 **Submit code** - Contribute bug fixes and new features
- 🧪 **Write tests** - Help improve code quality and coverage
- 🎨 **Design improvements** - Enhance the user interface and experience

## 🚀 Getting Started

### 1. Fork the Repository

1. Visit the project repository on GitHub
2. Click the "Fork" button in the top-right corner
3. Clone your forked repository:

```bash
git clone https://github.com/your-username/ai-media-platform.git
cd ai-media-platform
```

### 2. Set Up Development Environment

#### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- Git

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Frontend Setup
```bash
cd frontend
npm install
```

### 3. Create a Branch

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-description
```

**Branch Naming Convention:**
- `feature/feature-name` - For new features
- `bugfix/bug-description` - For bug fixes
- `docs/documentation-update` - For documentation changes
- `refactor/component-name` - For code refactoring
- `test/test-description` - For adding tests

## 📝 Development Guidelines

### Code Style

#### Frontend (TypeScript/React)
- Use TypeScript for all new code
- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error boundaries
- Write descriptive component and function names

**Example:**
```typescript
interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File;
  accept: string;
  maxSize: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  accept,
  maxSize
}) => {
  // Component implementation
};
```

#### Backend (Python/Flask)
- Follow PEP 8 style guide
- Use type hints where applicable
- Implement proper error handling
- Write docstrings for functions and classes

**Example:**
```python
def process_image(file: FileStorage) -> dict:
    """
    Process an image file and generate descriptive text.
    
    Args:
        file: The uploaded image file
        
    Returns:
        dict: Response containing generated text
        
    Raises:
        ValueError: If file format is not supported
    """
    # Function implementation
```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(frontend): add drag and drop file upload
fix(backend): resolve CORS issue with file uploads
docs(api): update endpoint documentation
style(components): improve button styling consistency
refactor(utils): extract common file validation logic
test(api): add unit tests for image processing endpoint
chore(deps): update React to version 18.3.1
```

### Testing Guidelines

#### Frontend Testing
```bash
cd frontend
npm run lint          # Run ESLint
npm run type-check     # TypeScript type checking
npm run test          # Run tests (when implemented)
```

#### Backend Testing
```bash
cd backend
python -m pytest     # Run tests (when implemented)
python -m flake8 .    # Code style checking
python -m mypy .      # Type checking
```

## 🧩 Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AudioToText.tsx
│   │   ├── FileUpload.tsx
│   │   ├── ImageToText.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── TextDisplay.tsx
│   │   └── VideoToText.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useTheme.tsx
│   ├── utils/              # Utility functions
│   │   ├── api.ts
│   │   └── fileValidation.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── package.json
└── vite.config.ts
```

### Backend Structure
```
backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── venv/                 # Virtual environment
└── .env                  # Environment variables (not in repo)
```

## 🐛 Bug Reports

When reporting bugs, please include:

### Issue Template
```markdown
## Bug Description
A clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Upload file '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 118.0]
- Node.js version: [e.g., 18.17.0]
- Python version: [e.g., 3.11.5]

## Screenshots
If applicable, add screenshots to help explain the problem.

## Additional Context
Any other context about the problem.
```

## 💡 Feature Requests

When suggesting features, please include:

### Feature Template
```markdown
## Feature Description
A clear and concise description of the feature.

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How do you envision this feature working?

## Alternatives Considered
Any alternative solutions you've considered.

## Additional Context
Any other context or screenshots about the feature request.
```

## 📋 Pull Request Process

### 1. Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review of the code completed
- [ ] Tests added for new functionality
- [ ] Documentation updated if needed
- [ ] No merge conflicts with main branch

### 2. Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that causes existing functionality to break)
- [ ] Documentation update

## Changes Made
- List specific changes made
- Include any new dependencies added
- Mention any configuration changes

## Testing
- [ ] Tested locally
- [ ] Added unit tests
- [ ] Verified in different browsers (frontend changes)
- [ ] Tested with different file types

## Screenshots (if applicable)
Include screenshots of UI changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have made corresponding changes to documentation
- [ ] My changes generate no new warnings
- [ ] New and existing unit tests pass
```

### 3. Review Process

1. **Automated Checks**: CI/CD pipeline runs automatically
2. **Code Review**: Maintainers review the code
3. **Testing**: Changes are tested thoroughly
4. **Approval**: Once approved, the PR can be merged

## 🎯 Good First Issues

Looking for a place to start? Check out issues labeled with:
- `good first issue` - Perfect for newcomers
- `help wanted` - Community help needed
- `documentation` - Documentation improvements

### Suggested First Contributions

#### Frontend
- [ ] Add loading states to components
- [ ] Improve responsive design
- [ ] Add accessibility features
- [ ] Create new UI components
- [ ] Improve error handling

#### Backend
- [ ] Add input validation
- [ ] Improve error messages
- [ ] Add API rate limiting
- [ ] Create health check endpoint
- [ ] Add logging improvements

#### Documentation
- [ ] Improve README sections
- [ ] Add code examples
- [ ] Create tutorials
- [ ] Fix typos and grammar
- [ ] Add API examples

## 🏆 Recognition

Contributors will be recognized in the following ways:

- Listed in the project's contributors section
- Mentioned in release notes for significant contributions
- Community recognition in discussions
- Potential maintainer invitation for consistent contributors

## 📞 Getting Help

If you need help with contributing:

1. **Check existing issues and discussions**
2. **Read the documentation thoroughly**
3. **Ask questions in GitHub Discussions**
4. **Join our community chat** (if available)

### Communication Guidelines

- Be respectful and inclusive
- Use clear and descriptive titles
- Provide context and examples
- Search existing issues before creating new ones
- Be patient with review process

## 🚀 Advanced Contributing

### Setting Up Development Environment

#### With Docker (Optional)
```bash
# Build and run the entire stack
docker-compose up --build

# Run specific services
docker-compose up frontend
docker-compose up backend
```

#### Environment Variables
Create `.env` files for development:

**Backend (.env):**
```bash
GOOGLE_AI_API_KEY=your_development_api_key
FLASK_ENV=development
FLASK_DEBUG=True
```

**Frontend (.env.local):**
```bash
VITE_API_URL=http://localhost:5000
VITE_APP_ENV=development
```

### Code Quality Tools

#### Pre-commit Hooks
```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Run on all files
pre-commit run --all-files
```

#### Continuous Integration
The project uses GitHub Actions for:
- Code quality checks
- Automated testing
- Build verification
- Security scanning

## 📚 Additional Resources

### Learning Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Google AI Documentation](https://ai.google.dev/docs)

### Tools and Extensions
- VS Code with recommended extensions
- ESLint and Prettier for code formatting
- Python extension for VS Code
- Git lens for better Git integration

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Thank You

Thank you for contributing to the AI Media Processing Platform! Your contributions help make this project better for everyone.

---

**Questions about contributing? Feel free to ask in GitHub Discussions or create an issue!**
