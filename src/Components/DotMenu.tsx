import './ChatScreen.css';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';

const DotMenu = () => {
  return (
    <div>
      <ul className='dot-menu-container'>
        <li className='dot-item'><GroupOutlinedIcon className='dot-icons' />Members</li>
        <hr />
        <li className='dot-item'><LocalPhoneOutlinedIcon className='dot-icons' />Share Number</li>
        <hr />
        <li className='dot-item'><SmsFailedOutlinedIcon className='dot-icons' />Report</li>
      </ul>
    </div>
  )
}

export default DotMenu;
