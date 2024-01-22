// assets
import { DashboardOutlined, SecurityScanOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  SecurityScanOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'security-exercise',
      title: 'Security Exercise',
      type: 'item',
      url: '/security-exercise',
      icon: icons.SecurityScanOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
