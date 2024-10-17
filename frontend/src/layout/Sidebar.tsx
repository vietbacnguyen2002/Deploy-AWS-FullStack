import { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  BadgeOutlined as BadgeOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  DateRange as DateRangeIcon,
  Store as StoreIcon,
  RecentActors as RecentActorsIcon,
  ShoppingBag as ShoppingBagIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  NoteAddOutlined,
} from "@mui/icons-material";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import type { Router, Navigation, Session } from "@toolpad/core";
import AddAlertIcon from "@mui/icons-material/AddAlert";

import Cookies from "js-cookie";
import { logout } from "../redux/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { Link, Outlet, useNavigate } from "react-router-dom";
import colors from "../constants/color";
import { Breadcrumbs, Typography } from "@mui/material";
const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Đơn hàng",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "inventory",
    title: "Kho hàng",
    icon: <InventoryIcon />,
  },
  {
    segment: "products",
    title: "Sản phẩm",
    icon: <StoreIcon />,
  },
  {
    segment: "suppliers",
    title: "Nhà cung cấp",
    icon: <NoteAddOutlined />,
  },
  {
    segment: "employees",
    title: "Nhân viên",
    icon: <BadgeOutlinedIcon />,
  },
  {
    segment: "notifications",
    title: "Thông báo",
    icon: <AddAlertIcon />,
  },
  {
    segment: "customers",
    title: "Khách hàng",
    icon: <PeopleAltOutlinedIcon />,
  },
  {
    segment: "reports",
    title: "Báo cáo",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "following products",
        title: "Theo sản phẩm",
        icon: <ShoppingBagIcon />,
      },
      {
        segment: "traffic",
        title: "Theo nhân viên",
        icon: <RecentActorsIcon />,
      },
      {
        segment: "date",
        title: "Theo thời gian",
        icon: <DateRangeIcon />,
      },
    ],
  },
  {
    segment: "settings",
    title: "Cài đặt",
    icon: <SettingsIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#F9F9FE",
          paper: "#EEEEF9",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: colors.dark,
          paper: colors.dark,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
        Cookies.remove("accessToken");
        navigate("/login");
        dispatch(logout());
      },
    };
  }, []);
  const [pathname, setPathname] = useState("/dashboard");

  const router = useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path));
        navigate(path);
      },
    };
  }, [pathname]);

  return (
    // preview-start
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        // logo: "https://avatars.githubusercontent.com/u/19550456",
        title: "Retail Store",
      }}
    >
      <DashboardLayout>
        <Breadcrumbs separator="-" sx={{ pl: 2, pt: 3 }}>
          <Typography key="3" sx={{ color: "text.primary" }}>
            Quản lý
          </Typography>
          <Link
            style={{ textDecoration: "none" }}
            key="1"
            to={pathname}
          >
            {pathname.replace("/", "").toLocaleUpperCase()}
          </Link>
        </Breadcrumbs>
        <Box
          component={"main"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: 4,
          }}
        >
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
