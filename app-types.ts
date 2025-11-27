export interface ChatWindowProps {
  chatId: string
  chatName: string
  onClose?: () => void
  onRefresh?: () => void
  onToggleLeadPanel?: (show: boolean) => void
  showLeadPanel?: boolean
}
