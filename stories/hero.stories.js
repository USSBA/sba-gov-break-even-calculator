import React from 'react'
import { withKnobs } from "@storybook/addon-knobs"
import Hero from "../src/components/molecules/hero/hero"

export default {
  title: 'Hero Banner',
  component: Hero,
  decorators: [withKnobs]

};

export const hero = () => <Hero/>
