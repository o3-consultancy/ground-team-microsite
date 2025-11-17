/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js}'],
    theme: {
        extend: {
            colors: {
                'primary-blue': '#003A6D',
                'primary-green': '#B2D235',
                'primary-blueTint': '#2C5A8B',
                'primary-blueShade': '#002650',
                'primary-greenTint': '#C9DF60',
                'primary-greenShade': '#8FA823',
                'accent-coral': '#FF6A4D',
                'accent-purple': '#6F3DD8',
                'accent-aqua': '#3DCFD1',
                'accent-midnight': '#30343C',
                'neutral-canvas': '#F7F9FB',
                'neutral-card': '#E8EDF2',
                'neutral-dark1': '#111111',
                'neutral-dark2': '#6B7280'
            },
            fontFamily: {
                lato: ['Lato', 'system-ui', 'sans-serif']
            },
            boxShadow: {
                soft: '0 6px 25px rgba(0,0,0,0.06)'
            },
            borderRadius: {
                '2xl': '1rem'
            }
        }
    },
    plugins: []
}
