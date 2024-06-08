import EmojiPicker from 'emoji-picker-react'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

export default function AddCollectionModal({ modal, setCollection }) {
  const [emojiPickerOn, setEmojiPickerOn] = useState(false)
  const [title, setTitle] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState({})
  const [color, setColor] = useState('')

  const handleEmojiPicker = () => {
    if (!emojiPickerOn)
      setEmojiPickerOn(true)
    else setEmojiPickerOn(false)
  }

  const onSelectEmoji = (emoji) => {
    if (emoji) {
      setSelectedEmoji(emoji)
      setEmojiPickerOn(false)
    }
  }

  const handleCreateCollection = () => {
    setCollection(prev => [...prev, {
      id: v4(),
      title,
      emoji: selectedEmoji,
      color,
      cards: [],
    }])
    modal(false)
  }

  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/80">
      <div className="p-10 text-white rounded-lg bg-gray-950/90 backdrop-blur-sm">
        <input type="text" name="title" className="bg-transparent border-b border-gray-500" placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <div className="relative flex items-center mt-8 gap-x-6">
          <svg onClick={handleEmojiPicker} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8S14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8S7 8.67 7 9.5S7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5" /></svg>
          <input className="bg-transparent border-b border-gray-500 w-[80px]" type="text" name="" id="" placeholder="hex code" onChange={e => setColor(e.target.value)} />
        </div>
        <div className="flex gap-4 mt-6">
          <button className="px-4 py-2 border rounded-lg" onClick={handleCreateCollection}>create</button>
          <button className="px-4 py-2 border rounded-lg" onClick={() => modal(false)}>cancel</button>
        </div>
        <EmojiPicker open={emojiPickerOn} onEmojiClick={emoji => onSelectEmoji(emoji)} style={{ position: 'absolute', top: '60%' }} />
      </div>
    </div>
  )
}
