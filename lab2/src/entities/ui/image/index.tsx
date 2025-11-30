type Props = { url: string; alt: string }

export const Image = ({ url, alt }: Props) => {
  return <img src={url} alt={alt} />
}
