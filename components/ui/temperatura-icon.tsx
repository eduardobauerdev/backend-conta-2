import { Flame, Coffee , Snowflake } from "lucide-react"

export interface TemperaturaIconProps {
  temperatura: string
  size?: number
  className?: string
}

export const TemperaturaIcon = ({ temperatura, size = 14, className }: TemperaturaIconProps) => {
  const iconProps = { size, className }
  
  switch (temperatura) {
    case "Quente":
      return <Flame {...iconProps} />
    case "Morno":
      return <Coffee {...iconProps} />
    case "Frio":
      return <Snowflake {...iconProps} />
    default:
      return <Coffee {...iconProps} />
  }
}

export default TemperaturaIcon