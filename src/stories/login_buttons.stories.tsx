import login_buttons from "../components/login_buttons";

import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "components/login_buttons",
  component: login_buttons,
  decorators: [
    (Story) => {
      return Story();
    },
  ],
} as Meta;

export const Default: StoryObj = {};
