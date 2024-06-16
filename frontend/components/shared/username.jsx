import PermIdentityIcon from '@mui/icons-material/PermIdentity';

function stringToColor(string) {
  let hash = 0;
  let i;
  
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  
  return color;
}

function stringAvatar(name) {
  const firstName = name.split('')[0][0];
  const lastName = name.split('')[1][0];
  
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstName}${lastName?lastName:''}`,
  };
}



export default function UserName({ name }) {
  return (
    <div className="flex items-center">
        <PermIdentityIcon />
        <p
          className="text-center"
          style={{ alignSelf: "center" }}
        >
          {name}
        </p>
      </div>
    
  );
}