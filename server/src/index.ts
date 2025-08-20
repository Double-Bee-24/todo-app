export function greet(name: string): string {
  return `Hello, ${name}!`
}

function main(): void {
  console.log(greet('World'))
}

main()

process.on('SIGTERM', () => {
  console.log('Shutting down...')
  process.exit(0)
})
process.on('SIGINT', () => {
  console.log('Shutting down...')
  process.exit(0)
})
