import React, {
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clone, isNil} from 'lodash';

import Outing from '@models/Outing';
import Api from '@services/Api';
import OutingRound from '@models/OutingRound';
import OutingPlayer from '@models/OutingPlayer';

export interface State {
  outing?: Outing;
  setOuting: React.Dispatch<React.SetStateAction<Outing | undefined>>;
  refreshOuting: () => void;
  outingPlayers: OutingPlayer[];
  setOutingPlayers: React.Dispatch<React.SetStateAction<OutingPlayer[]>>;
  outingRounds: OutingRound[];
  setOutingRounds: React.Dispatch<React.SetStateAction<OutingRound[]>>;
}

export const OutingContext = React.createContext<State>({
  setOuting: () => {},
  refreshOuting: () => {},
  outingPlayers: [],
  setOutingPlayers: () => {},
  outingRounds: [],
  setOutingRounds: () => {},
});
export const OutingContextConsumer = OutingContext.Consumer;

export const OutingContextProvider: React.FC = ({children}) => {
  const [outing, setOuting] = useState<Outing>();
  const [outingPlayers, setOutingPlayers] = useState<OutingPlayer[]>([]);
  const [outingRounds, setOutingRounds] = useState<OutingRound[]>([]);

  // Save outing selection
  useEffect(() => {
    if (!isNil(outing)) {
      AsyncStorage.setItem('outingId', outing.id.toString());
    }
  }, [outing]);

  // Load previous outing selection
  useEffect(() => {
    AsyncStorage.getItem('outingId').then((outingIdString) => {
      if (!isNil(outingIdString)) {
        const outingId = parseInt(outingIdString, 10);
        Api.getOuting(outingId).then((savedOuting) => {
          setOuting(savedOuting);
        });
      }
    });
  }, []);

  // Load outing data
  useEffect(() => {
    if (!isNil(outing)) {
      setOutingPlayers([]);
      setOutingRounds([]);

      Api.getOutingRounds(outing.id).then((foundOutingRounds) => {
        setOutingRounds(foundOutingRounds);
      });

      Api.getOutingPlayers(outing.id).then((foundOutingPlayers) => {
        setOutingPlayers(foundOutingPlayers);
      });
    }
  }, [outing]);

  const refreshOuting = useCallback(() => {
    const newOuting = clone(outing);
    setOuting(newOuting);
  }, [outing]);

  const context: State = useMemo(() => {
    const newContext = {
      outing,
      setOuting,
      refreshOuting,
      outingPlayers,
      setOutingPlayers,
      outingRounds,
      setOutingRounds,
    };
    console.debug('OutingContext', 'was updated', newContext);
    return newContext;
  }, [
    outing,
    setOuting,
    refreshOuting,
    outingPlayers,
    setOutingPlayers,
    outingRounds,
    setOutingRounds,
  ]);

  return (
    <OutingContext.Provider value={context}>{children}</OutingContext.Provider>
  );
};

export const useOuting = (): State => {
  const {
    outing,
    setOuting,
    refreshOuting,
    outingPlayers,
    setOutingPlayers,
    outingRounds,
    setOutingRounds,
  } = useContext<State>(OutingContext);
  return useMemo(() => {
    return {
      outing,
      setOuting,
      refreshOuting,
      outingPlayers,
      setOutingPlayers,
      outingRounds,
      setOutingRounds,
    };
  }, [
    outing,
    setOuting,
    refreshOuting,
    outingPlayers,
    setOutingPlayers,
    outingRounds,
    setOutingRounds,
  ]);
};
