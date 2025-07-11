<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/usmanghias/codcrafters-calendar">
   <img src="apps/web/public/logo.svg" alt="CODCrafters Calendar Logo" width="200">
  </a>

  <h3 align="center">CODCrafters Calendar</h3>

  <p align="center">
    Professional scheduling infrastructure for modern teams.
    <br />
    <strong>Forked from Cal.com and maintained by Usman Ghias / CODCrafters</strong>
    <br />
    <br />
    <a href="https://github.com/usmanghias/codcrafters-calendar/discussions">Discussions</a>
    ·
    <a href="https://calendar.codcrafters.org">Website</a>
    ·
    <a href="https://github.com/usmanghias/codcrafters-calendar/issues">Issues</a>
    ·
    <a href="https://calendar.codcrafters.org/roadmap">Roadmap</a>
  </p>
</p>

<p align="center">
   <a href="https://github.com/usmanghias/codcrafters-calendar/stargazers"><img src="https://img.shields.io/github/stars/usmanghias/codcrafters-calendar" alt="Github Stars"></a>
   <a href="https://github.com/usmanghias/codcrafters-calendar/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-purple" alt="License"></a>
   <a href="https://github.com/usmanghias/codcrafters-calendar/pulse"><img src="https://img.shields.io/github/commit-activity/m/usmanghias/codcrafters-calendar" alt="Commits-per-month"></a>
   <a href="https://calendar.codcrafters.org/pricing"><img src="https://img.shields.io/badge/Pricing-Free-brightgreen" alt="Pricing"></a>
</p>

## About This Fork

This is a white-labeled fork of [Cal.com](https://github.com/calcom/cal.com) maintained by **Usman Ghias** under the **CODCrafters** brand. 

### What's Changed
- **Complete rebranding** from Cal.com to CODCrafters Calendar
- **Dark theme** with custom indigo and lime green color scheme
- **Custom domain support** for `calendar.codcrafters.org`
- **Professional SaaS-ready** configuration
- **Enhanced branding** throughout the application

### Original Cal.com Credits
This project is based on the excellent open-source work by the Cal.com team. Original Cal.com repository: https://github.com/calcom/cal.com

**License**: AGPLv3 (same as original Cal.com)

## Features

- **Professional Scheduling**: Modern calendar infrastructure for teams
- **Dark Theme**: Beautiful dark indigo and lime green color scheme
- **Custom Branding**: Fully branded as CODCrafters Calendar
- **Self-Hosted**: Complete control over your scheduling infrastructure
- **API Ready**: RESTful API for integrations
- **Multi-tenant**: Support for organizations and teams

## Quick Start

```bash
# Clone the repository
git clone https://github.com/usmanghias/codcrafters-calendar.git
cd codcrafters-calendar

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env

# Start development server
   yarn dev
   ```

Visit `http://localhost:3000` to see CODCrafters Calendar in action!

## Environment Variables

Key environment variables for CODCrafters Calendar:

```bash
# App Configuration
NEXT_PUBLIC_APP_NAME="CODCrafters Calendar"
NEXT_PUBLIC_COMPANY_NAME="CODCrafters, Inc."
NEXT_PUBLIC_SUPPORT_MAIL_ADDRESS="support@codcrafters.org"

# URLs
NEXT_PUBLIC_WEBAPP_URL="http://localhost:3000"
NEXT_PUBLIC_WEBSITE_URL="https://calendar.codcrafters.org"

# Database
DATABASE_URL="postgresql://..."
```

## Contributing

This is a maintained fork by Usman Ghias. For issues specific to this fork, please use the [Issues](https://github.com/usmanghias/codcrafters-calendar/issues) page.

For contributions to the original Cal.com project, please visit: https://github.com/calcom/cal.com

## License

This project is licensed under the AGPLv3 License - see the [LICENSE](LICENSE) file for details.

## Support

- **CODCrafters Calendar Support**: support@codcrafters.org
- **Original Cal.com Support**: help@cal.com

---

**Built with ❤️ by Usman Ghias / CODCrafters**
