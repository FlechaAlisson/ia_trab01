const srcBlocks = (src, textarea) => {
    src = src.replace(/\r/g, '').trim()
    textarea.val(src)
    let count = 0
    const lines = src.trim().split('\n').map((line) => {
        const start = count
        const end = count + line.length
        count = end + 1
        return {start, end}
    })
    const obj = {
        blocks: {},
        set: function({ id, first_line, last_line }) {
            const start = lines[first_line].start
            const end = lines[last_line].end
            this.blocks[id] = {start, end}
            return this
        },
        select: function(id) {
            textarea.select()
            const {start, end} = this.blocks[id]
            textarea[0].selectionStart = start
            textarea[0].selectionEnd = end
            return this
        }
    }
    return obj
}
export default srcBlocks