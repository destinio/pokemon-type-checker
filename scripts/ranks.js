#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const filePath = process.argv[2]

if (!filePath) {
  console.error('Usage: csvtojson <file.csv>')
  process.exit(1)
}

const csv = fs.readFileSync(path.resolve(filePath), 'utf-8')

const [headerLine, ...lines] = csv.trim().split('\n')
// map over and remove \" from headers
const headers = headerLine.split(',').map(h => h.replace(/"/g, ''))

const json = lines.map(line => {
  const values = line.split(',')
  return Object.fromEntries(
    headers.map((h, i) => {
      const key = h.split(' ')[0].trim().replace(/"/g, '').toLowerCase()
      const valueRaw = values[i].trim().replace(/"/g, '')
      const value = !isNaN(valueRaw) ? parseFloat(valueRaw) : valueRaw
      return [key, value]
    })
  )
})

console.log(JSON.stringify(json))
