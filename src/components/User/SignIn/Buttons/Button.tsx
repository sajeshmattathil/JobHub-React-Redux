import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type button = {
  className : string;
  style : React.CSSProperties;
  type : 'submit' | 'reset' | 'button'
}
export default function BasicButtons({className,style,type} : button) {
  return (
    <Stack spacing={2} direction="row">
      <Button type={type} className={className}  variant="contained" sx={ style}>Sign In</Button>
    </Stack>
  );
}