import React, { useState, useMemo, useEffect, useContext } from "react";
import { Dimensions, AppState, ScaledSize, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isNil } from "lodash";

import Outing from "@/models/Outing";
import Player from "@/models/Player";
import Api from "@/services/Api";

type Orientation = "vertical" | "horizontal";

export interface State {
  player?: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;
  outings: Outing[];
  setOutings: React.Dispatch<React.SetStateAction<Outing[]>>;
  appState?: string;
  orientation: Orientation;
  windowWidth: number;
  windowHeight: number;
}

export const AppConfigContext = React.createContext<State>({
  setPlayer: () => {},
  outings: [],
  setOutings: () => {},
  orientation: "vertical",
  windowWidth: 0,
  windowHeight: 0,
});
export const AppConfigContextConsumer = AppConfigContext.Consumer;

export const AppConfigContextProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = useState<Player>();
  const [outings, setOutings] = useState<Outing[]>([]);
  const [orientation, setOrientation] = useState<Orientation>("vertical");
  const windowDimensions = useWindowDimensions();
  const appState = useAppState();

  // Save player when selected
  useEffect(() => {
    if (!isNil(player)) {
      AsyncStorage.setItem("emailAddress", player.emailAddress);
    }
  }, [player]);

  // Load previous selected player
  useEffect(() => {
    AsyncStorage.getItem("emailAddress").then((emailAddress) => {
      if (!isNil(emailAddress)) {
        Api.getPlayer(emailAddress).then((foundPlayer) => {
          setPlayer(foundPlayer);
        });
      }
    });
  }, []);

  // Load outings for player
  useEffect(() => {
    setOutings([]);
    if (!isNil(player)) {
      Api.getOutings(player.id).then((foundOutings) => {
        setOutings(foundOutings);
      });
    }
  }, [player]);

  // Set orientation
  useEffect(() => {
    if (windowDimensions.width > windowDimensions.height) {
      setOrientation("horizontal");
    } else {
      setOrientation("vertical");
    }
  }, [windowDimensions]);

  const context: State = useMemo(() => {
    const newContext = {
      player,
      setPlayer,
      outings,
      setOutings,
      appState,
      orientation,
      windowWidth: windowDimensions.width,
      windowHeight: windowDimensions.height,
    };
    //console.debug('AppConfigContext', 'was updated', newContext);
    return newContext;
  }, [
    player,
    setPlayer,
    outings,
    setOutings,
    appState,
    orientation,
    windowDimensions.width,
    windowDimensions.height,
  ]);

  return (
    <AppConfigContext.Provider value={context}>
      {children}
    </AppConfigContext.Provider>
  );
};

const useWindowDimensions = (): ScaledSize => {
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const __handleChange = (event: { window: ScaledSize }) => {
      if (
        dimensions.width !== event.window.width ||
        dimensions.height !== event.window.height
      ) {
        setDimensions(event.window);
      }
    };

    const listener = Dimensions.addEventListener("change", __handleChange);
    return () => {
      listener.remove();
    };
  }, [dimensions]);

  return dimensions;
};

const useAppState = (): AppStateStatus => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const __handleChange = (newAppState: AppStateStatus) => {
      if (appState !== newAppState) {
        setAppState(newAppState);
      }
    };

    const listener = AppState.addEventListener("change", __handleChange);
    return () => {
      listener.remove();
    };
  }, [appState]);

  return appState;
};

export const useAppConfig = (): State => {
  const {
    player,
    setPlayer,
    outings,
    setOutings,
    appState,
    orientation,
    windowWidth,
    windowHeight,
  } = useContext<State>(AppConfigContext);
  return useMemo(() => {
    return {
      player,
      setPlayer,
      outings,
      setOutings,
      appState,
      orientation,
      windowWidth,
      windowHeight,
    };
  }, [
    player,
    setPlayer,
    outings,
    setOutings,
    appState,
    orientation,
    windowWidth,
    windowHeight,
  ]);
};
