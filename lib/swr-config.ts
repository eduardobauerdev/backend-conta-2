export const ATTR_CACHE_KEY = "global-chat-attributions"
export const CHAT_LIST_CACHE_KEY = "global-chat-list"

export type AtribuicoesMap = Record<
  string,
  {
    assigned_to_id: string
    assigned_to_name: string
    assigned_to_cargo?: string
    assigned_to_color?: string
  }
>
