const fs = require('fs')

export const readShader = (path: string) => {
console.log('\n\n===================== cruitive-db .env ======================\n')
const dataa = fs.readFile('.env', 'utf8', (err: any, data: any) => {
  const lines = data.split('\n')
  for (const line of lines) {
    const [ name, value ] = line.split('=')
    if (name === 'PRISMA_ENDPOINT') {
      if (value === 'https://cruitive-prisma-server.herokuapp.com') {
        console.log('Be careful! Prisma endpoint is targeting your live database.')
      } else {
        console.log('Local db targeted.')
      }
      console.log('endpoint: ', value)
    }
  }
  console.log('\n=============================================================\n')
})
}