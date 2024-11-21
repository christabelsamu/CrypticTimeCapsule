# Cryptic Time Capsule

Cryptic Time Capsule is a decentralized application (dApp) built on the Stacks blockchain that allows users to create time-locked digital capsules. These capsules can contain encrypted messages or files that are only accessible after a specific date in the future or when certain global conditions are met (e.g., when Bitcoin reaches a certain price).

## Features

- Create time capsules with encrypted messages
- Set unlock conditions based on time or Bitcoin price
- Secure storage on the Stacks blockchain
- Decentralized Bitcoin price oracle integration

## Smart Contracts

The project consists of two main smart contracts:

1. \`time-capsule.clar\`: Manages the creation and unlocking of time capsules
2. \`bitcoin-price-oracle.clar\`: A simple oracle for Bitcoin price (for demonstration purposes)

## Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet): A Clarity runtime packaged as a command line tool
- [Node.js](https://nodejs.org/) (v14 or later)
- [Vitest](https://vitest.dev/) for running tests

## Setup

1. Clone the repository:
   \`\`\`
   git clone https://github.com/your-username/cryptic-time-capsule.git
   cd cryptic-time-capsule
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Run Clarinet console:
   \`\`\`
   clarinet console
   \`\`\`

## Testing

Run the test suite using Vitest:

\`\`\`
npm test
\`\`\`

## Usage

1. Deploy the smart contracts to the Stacks blockchain using Clarinet.
2. Interact with the contracts using a Stacks wallet or a custom frontend application.

### Creating a Time Capsule

Call the \`create-capsule\` function in the \`time-capsule\` contract:

\`\`\`clarity
(contract-call? .time-capsule create-capsule "Your encrypted message" unlock-time btc-price-condition)
\`\`\`

### Unlocking a Time Capsule

Call the \`unlock-capsule\` function in the \`time-capsule\` contract:

\`\`\`clarity
(contract-call? .time-capsule unlock-capsule capsule-id)
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

