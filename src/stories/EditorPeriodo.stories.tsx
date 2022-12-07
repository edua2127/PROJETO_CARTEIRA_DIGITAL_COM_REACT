// @ts-ignore
import EditorPeriodo from "../components/EditorPeriodo.tsx";
import { Provider } from "react-redux";
// @ts-ignore
import { store } from "../redux/store.ts";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "components/EditorPeriodo",
  component: EditorPeriodo,
  decorators: [
    (Story) => {
      return <Provider store={store}>{Story()}</Provider>;
    },
  ],
} as Meta;

//const Template = (args) => <EditorPeriodo {...args} />;

export const Default = {};
