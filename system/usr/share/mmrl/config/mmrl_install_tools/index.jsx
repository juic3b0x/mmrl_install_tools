import React from "react";
import { Page, ListItemDialogEditText } from "@mmrl/ui";
import { ConfigProvider } from "@mmrl/providers";
import { useConfig, useActivity } from "@mmrl/hooks";
import { Typography, Divider, Card, CardContent, CardActionArea, Switch, List, ListItemButton, ListSubheader, ListItem, ListItemText } from "@mui/material";

const TerminalActivity = include("activitys/TerminalActivity.jsx");
const RenderToolbar = include("components/RenderToolbar.jsx");
const CenterBox = include("components/CenterBox.jsx");

function App() {
  const { context } = useActivity();
  const [config, setConfig] = useConfig();

  if (BuildConfig.VERSION_CODE < 21410) {
    return (
      <Page renderToolbar={RenderToolbar("Version mismatch")}>
        <CenterBox>
          MMRL Install Tools requires MMRL above <strong>2.14.10</strong>!
        </CenterBox>
      </Page>
    );
  }

  return (
    <Page sx={{ p: 0 }} renderToolbar={RenderToolbar("MMRL Install Tools")}>
      <Card sx={{ m: 1 }}>
        <CardActionArea
          onClick={() => {
            context.pushPage({
              component: TerminalActivity,
              key: "Terminal",
              extra: {},
            });
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Logcat
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can now view logs inside MMRL Install Tools to make the bug hunt more easier. Click to try it out!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem>
          <ListItemText primary="Clear terminal" secondary="Clears the terminal after the download" />
          <Switch checked={config.clear_terminal} onChange={(e) => setConfig("clear_terminal", e.target.checked)} />
        </ListItem>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setConfig("curl", val);
          }}
          inputLabel="Path"
          type="text"
          title="Change curl bin path"
          initialValue={config.curl}
        >
          <ListItemText primary="Change curl bin path" secondary={config.curl} />
        </ListItemDialogEditText>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setConfig("zip", val);
          }}
          inputLabel="Path"
          type="text"
          title="Change zip bin path"
          initialValue={config.zip}
        >
          <ListItemText primary="Change zip bin path" secondary={config.zip} />
        </ListItemDialogEditText>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setConfig("unzip", val);
          }}
          inputLabel="Path"
          type="text"
          title="Change unzip bin path"
          initialValue={config.unzip}
        >
          <ListItemText primary="Change unzip bin path" secondary={config.unzip} />
        </ListItemDialogEditText>
      </List>

      <List subheader={<ListSubheader>Arguments</ListSubheader>}>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setConfig("curl__args", val);
          }}
          inputLabel="Arguments"
          type="text"
          title="Add extra curl arguments"
          initialValue={config.curl__args}
        >
          <ListItemText primary="Add extra curl arguments" secondary={config.curl__args} />
        </ListItemDialogEditText>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setConfig("zip__args", val);
          }}
          inputLabel="Arguments"
          type="text"
          title="Add extra zip arguments"
          initialValue={config.zip__args}
        >
          <ListItemText primary="Add extra zip arguments" secondary={config.zip__args} />
        </ListItemDialogEditText>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setConfig("unzip__args", val);
          }}
          inputLabel="Arguments"
          type="text"
          title="Add extra unzip arguments"
          initialValue={config.unzip__args}
        >
          <ListItemText primary="Add extra unzip arguments" secondary={config.unzip__args} />
        </ListItemDialogEditText>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Project</ListSubheader>}>
        <ListItemButton onClick={() => window.open("https://github.com/DerGoogler/MMRL/issues")}>
          <ListItemText primary="Report a issue" />
        </ListItemButton>
      </List>
    </Page>
  );
}

const version = "v1";
export default () => {
  return (
    <ConfigProvider
      initialConfig={{
        curl: "/system/usr/share/mmrl/bin/curl",
        zip: "/system/usr/share/mmrl/bin/zip",
        unzip: "/system/bin/unzip",
        clear_terminal: true,
        curl__args: "-L",
        zip__args: "-r",
        unzip__args: "-qq",
      }}
      loadFromFile={`/data/adb/mmrl/mmrlini.${version}.json`}
      loader="json"
    >
      <App />
    </ConfigProvider>
  );
};
