import { Text, View } from "@/components/Themed";
import { FlatList, Pressable } from "react-native";
import { useNoteStore } from "@/state/index";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@/utils/colors";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import catagoryJSON from "@/constants/catagories.json";
import clientsJSON from "@/constants/clients.json";
import { useEffect } from "react";

export default function TabOneScreen() {
  const { newNote, removeNote, editNote, notes, loadNotes, saveNotes } =
    useNoteStore((state) => state);
  const handleRemove = (id: string) => {
    removeNote(id);
    saveNotes();
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View className="flex items-center justify-center h-full w-full">
      <FlatList
        data={notes}
        className="p-8 w-full"
        renderItem={({ item }) => (
          <View
            key={item.id}
            className="flex items-center w-full flex-row justify-between h-4 border-t border-light-background py-4"
          >
            <Text className="flex items-center justify-center capitalize">
              {item.title}
            </Text>
            <Text className="flex items-center justify-center text-[0.5rem]">
              {clientsJSON.clients.find((x) => item.clientId == x.value)?.label}
            </Text>
            <Text className="flex items-center justify-center text-[0.5rem]">
              {
                catagoryJSON.categories.find((x) => item.categoryId == x.value)
                  ?.label
              }
            </Text>
            <Text className="flex items-center justify-center text-[0.5rem]">
              {item.modifiedDate.toLocaleString()}
            </Text>
            <View className="flex flex-row gap-x-2">
              <TouchableOpacity onPress={() => handleRemove(item.id)}>
                <View className="rounded-full bg-red-500 h-5 w-5 items-center justify-center">
                  <AntDesign name="delete" size={10} color={colors.dark.text} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Link
                  href={
                    {
                      pathname: "/addEditNote",
                      params: { note: item.id },
                    } as any
                  }
                >
                  <View className="rounded-full bg-blue-500 h-5 w-5 items-center justify-center">
                    <AntDesign name="edit" size={10} color={colors.dark.text} />
                  </View>
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View className="border-b border-light-background">
            {notes.length === 0 && (
              <Text className=" flex items-center justify-center w-full h-full pb-4">
                There are no notes to display
              </Text>
            )}
          </View>
        }
      />
      {true && (
        <Pressable className="absolute bottom-4 right-4" onPress={() => false}>
          <Link href={"/addEditNote"}>
            <View className=" bg-light-tint shadow-md rounded-full  h-10 w-10 items-center justify-center">
              <AntDesign name="addfile" size={16} color={colors.dark.text} />
            </View>
          </Link>
        </Pressable>
      )}
    </View>
  );
}
