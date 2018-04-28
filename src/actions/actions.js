export const updateEditorContent = newValue => {
  return {
    type: 'UPDATE_EDITOR_CONTENT',
    payload: { currentContent: newValue }
  }
}

export const emitEditorContent = content => {
  return {
    type: 'EMIT_EDITOR_CONTENT',
    payload: { emitContent: content }
  }
}