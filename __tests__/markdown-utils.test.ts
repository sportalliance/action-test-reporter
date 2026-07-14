import {Align, table, tableEscape} from '../src/utils/markdown-utils.js'

// Counts the GFM cells in a table row by counting unescaped pipe delimiters.
// A row `| a | b | c |` has 4 unescaped pipes and therefore 3 cells.
function cellCount(row: string): number {
  const pipes = row.match(/(?<!\\)\|/g)?.length ?? 0
  return pipes - 1
}

describe('markdown-utils table escaping', () => {
  it('escapes every pipe in a cell, not just the first one', () => {
    // Test/suite names regularly contain more than one pipe, e.g. a TypeScript
    // union rendered in a test title.
    expect(tableEscape("Type 'A | B | C'")).toBe("Type 'A \\| B \\| C'")
  })

  it('keeps the content row cell count aligned with the header when a cell contains multiple pipes', () => {
    const headers = ['Name', 'Passed', 'Time']
    const align = [Align.Left, Align.Right, Align.Right]
    const md = table(headers, align, ['a | b | c', '1', '5ms'])
    const rows = md.split('\n')
    const headerCells = cellCount(rows[0])
    const contentCells = cellCount(rows[rows.length - 1])
    expect(contentCells).toBe(headerCells)
  })
})
