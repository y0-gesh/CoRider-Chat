import './ChatScreen.css';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

const AttachItems = () => {
  return (
    <div className='attach-cont'>
      <ul className='attach-list'>
        <li className='att-item'><CameraAltOutlinedIcon /></li>
        <li className='att-item'><VideocamOutlinedIcon /></li>
        <li className='att-item'><UploadFileOutlinedIcon /></li>
      </ul>
    </div>
  )
}

export default AttachItems;
