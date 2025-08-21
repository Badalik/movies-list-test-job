import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const primengPreset = definePreset(Aura, {
  semantic: {
    primitive: {
      red: {
        50: '#fbeeed',
        100: '#f8e0de',
        200: '#f1c0bd',
        300: '#eca099',
        400: '#e87c71',
        500: '#d95947',
        600: '#af4638',
        700: '#853328',
        800: '#5d2219',
        900: '#38110c',
        950: '#230805',
      },
      slate: {
        50: '#f9f9f9',
        100: '#f1f1f1',
        200: '#e5e5e5',
        300: '#d8d8d8',
        400: '#b6b6b6',
        500: '#969696',
        600: '#747474',
        700: '#575757',
        800: '#3b3b3b',
        900: '#1f1f1f',
        950: '#131313',
      },
    },
    primary: {
      50: '{yellow.50}',
      100: '{yellow.100}',
      200: '{yellow.200}',
      300: '{yellow.300}',
      400: '{yellow.400}',
      500: '{yellow.500}',
      600: '{yellow.600}',
      700: '{yellow.700}',
      800: '{yellow.800}',
      900: '{yellow.900}',
      950: '{yellow.950}',
    },
    form: {
      field: {
        border: {
          radius: '4px',
        },
        padding: {
          y: '0.5625rem',
        },
        sm: {
          padding: {
            y: '0.4375rem',
          },
        },
      },
    },
    colorScheme: {
      light: {
        primitive: {
          yellow: {
            50: '#fff5ee',
            100: '#ffede2',
            200: '#ffdcc3',
            300: '#ffca9f',
            400: '#ffb872',
            500: '#ffa515',
            600: '#ca8100',
            700: '#965e00',
            800: '#653e00',
            900: '#382100',
            950: '#221200',
          },
        },
        primary: {
          color: '{primary.500}',
        },
        form: {
          field: {
            color: '#414859',
          },
        },
      },
      dark: {
        primitive: {
          yellow: {
            50: '#fffcf7',
            100: '#fff5e5',
            200: '#ffecc9',
            300: '#ffe2a9',
            400: '#ffdc8f',
            500: '#ffd152',
            600: '#cda300',
            700: '#957600',
            800: '#634d00',
            900: '#352800',
            950: '#211800',
          },
        },
        primary: {
          color: '{primary.500}',
        },
        surface: {
          50: '#eeeeee',
          100: '#e0dfe0',
          200: '#c0bdbf',
          300: '#a39fa2',
          400: '#878286',
          500: '#6b676a',
          600: '#4e4b4d',
          700: '#3b383a',
          800: '#292728',
          900: '#181718',
          950: '#0f0e0e',
        },
        form: {
          field: {
            color: '{color.text}',
            background: 'transparent',
          },
        },
      },
    },
  },
  components: {
    button: {
      colorScheme: {
        light: {
          outlined: {
            primary: {
              color: '#414859',
              border: {
                color: '{primary.500}',
              },
            },
          },
        },
        dark: {
          outlined: {
            primary: {
              color: '{color.text}',
              border: {
                color: '{primary.500}',
              },
            },
          },
        },
      },
      padding: {
        y: '0.5rem',
      },
      sm: {
        padding: {
          y: '0.375rem',
        },
      },
      labelFontWeight: '600',
    },
    select: {
      dropdown: {
        width: '1.75rem',
      },
    },
  },
});
