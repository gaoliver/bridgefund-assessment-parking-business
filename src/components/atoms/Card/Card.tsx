import React, { PropsWithChildren } from 'react'
import styles from './Card.module.css'

interface CardProps extends PropsWithChildren {
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({children, style}) => {
  return (
    <div className={styles.component} style={style}>{children}</div>
  )
}
