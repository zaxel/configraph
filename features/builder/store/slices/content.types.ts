import { ContentComponent, TextType } from "@/features/configurator/model";

export type ContentText = ContentComponent["content"][number];

export type ContentSlice = {
  updateContentTittle: (moduleId: string, value: string) => void,
  updateTextOption: (moduleId: string, textId: string, patch: Partial<ContentText>) => void,
  setTextType: (moduleId: string, contentId: string, type: TextType) => void,
  deleteTextOption: (moduleId: string, contentId: string) => void,
  addTextOption: (moduleId: string, content: ContentText) => void,
}

export type UpdateContentText = (
  moduleId: string,
  textId: string,
  patch: Partial<ContentText>
) => void; 
