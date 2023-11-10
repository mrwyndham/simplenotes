import {
  View,
  TextInput,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import catagoryJSON from "../constants/catagories.json";
import clientsJSON from "../constants/clients.json";
import { useNoteStore } from "../state";
import uuid from "react-native-uuid";
import { FontAwesome } from "@expo/vector-icons";
import colors from "@/utils/colors";
import { useLocalSearchParams } from "expo-router";

const AddEditNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [catagoryValue, setCatagoryValue] = useState("");
  const [catagory, setCatagory] = useState(catagoryJSON.categories);
  const [clientValue, setClientValue] = useState("");
  const [client, setClient] = useState(clientsJSON.clients);
  const [error, setError] = useState(false);
  const { newNote, saveNotes, editNote, notes } = useNoteStore(
    (state) => state
  );

  const params = useLocalSearchParams();
  useEffect(() => {
    if (params?.note) {
      const myNote = notes.find((x) => x.id == (params?.note as string));
      setTitle(myNote?.title ?? "");
      setNote(myNote?.content ?? "");
      setCatagoryValue(myNote?.categoryId ?? "");
      setClientValue(myNote?.clientId ?? "");
    }
  }, [params]);

  const handleAddEdit = () => {
    setError(false);

    if (params?.note) {
      if (
        title != "" &&
        note != "" &&
        catagoryValue != "" &&
        clientValue != ""
      ) {
        editNote({
          id: params.note as string,
          createdDate: new Date(),
          modifiedDate: new Date(),
          clientId: clientValue,
          categoryId: catagoryValue,
          title: title,
          content: note,
        });
        saveNotes();
      } else {
        setError(true);
      }
    } else {
      if (
        title != "" &&
        note != "" &&
        catagoryValue != "" &&
        clientValue != ""
      ) {
        newNote({
          id: uuid.v4() as string,
          createdDate: new Date(),
          modifiedDate: new Date(),
          clientId: clientValue,
          categoryId: catagoryValue,
          title: title,
          content: note,
        });
        saveNotes();
      } else {
        setError(true);
      }
    }
  };

  return (
    <View className="flex h-full w-full p-4">
      <Dropdown
        value={clientValue}
        setValue={setClientValue as any}
        items={client}
        setItems={setClient as any}
        zIndex={3000}
        zIndexInverse={1000}
        placeholder="Select Client"
      />
      <Dropdown
        value={catagoryValue}
        setValue={setCatagoryValue as any}
        items={catagory}
        setItems={setCatagory as any}
        zIndex={2000}
        zIndexInverse={2000}
        placeholder="Select Catagory"
      />
      <TextInput
        className="w-full border-b-2 border-gray-200 text-dark-text px-4 my-4 py-4 text-[1.2rem]"
        editable
        numberOfLines={1}
        maxLength={40}
        onChangeText={setTitle}
        value={title}
        placeholder="Enter your title here"
      />
      <TextInput
        className="w-full h-full border-b-2 border-gray-200 text-dark-text px-4 pt-4 placeholder:text-light-tabIconDefault"
        editable
        multiline
        maxLength={1200}
        onChangeText={setNote}
        value={note}
        placeholder="Type your note..."
      />
      <TouchableOpacity
        onPress={handleAddEdit}
        className={`${
          error ? "bg-red-400" : "bg-light-tabIconSelected"
        } p-2 rounded-2xl px-4 flex flex-row items-center justify-center gap-x-2 mt-4`}
      >
        <FontAwesome name="save" color={colors.light.background} />
        <Text className="text-light-background">Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEditNote;
