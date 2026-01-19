import {MantineThemeOverride} from "@mantine/core";

export const customTheme: MantineThemeOverride = {
    defaultRadius: 'md',
    colorScheme: 'light',
    colors: {
        'secondary': ['#fff7e0', '#f0e1bf', '#e3ca9a', '#d7b174', '#ca964e', '#b17935', '#8a6428', '#634c1b', '#3d310d', '#1a1200'],
        'primary': ['#e3fced', '#c0eecf', '#9be3b0', '#74d68e', '#4eca6a', '#35b14c', '#278a41', '#196232', '#0c3c20', '#001606']
    },
    primaryColor: 'primary',
    primaryShade: 6,
    fontFamily: 'Montserrat, sans-serif',
    spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    shadows: {
        xs: '0 1px 3px rgba(0, 0, 0, 0.08)',
        sm: '0 2px 6px rgba(0, 0, 0, 0.1)',
        md: '0 4px 12px rgba(0, 0, 0, 0.12)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
        xl: '0 12px 32px rgba(0, 0, 0, 0.18)',
    },
    components: {
        Button: {
            styles: (theme) => ({
                root: {
                    fontWeight: 600,
                    transition: 'all 200ms ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                    }
                }
            })
        },
        Card: {
            styles: (theme) => ({
                root: {
                    transition: 'all 300ms ease',
                }
            })
        }
    }
}
