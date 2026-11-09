"use client";

import { useRef, useState } from "react";
import { FileText, X } from "lucide-react";
import { Button } from "@/components/own/base/button";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/own/composed/attachment";

export function RemovableAttachment() {
  const [visible, setVisible] = useState(true);
  const moveFocus = useRef(false);

  function toggleAttachment() {
    moveFocus.current = true;
    setVisible((current) => !current);
  }

  function focusNewAction(node: HTMLElement | null) {
    if (node && moveFocus.current) {
      moveFocus.current = false;
      node.focus();
    }
  }

  return (
    <div className="flex justify-center">
      {visible ? (
        <Attachment>
          <AttachmentMedia><FileText aria-hidden="true" /></AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>Informe.pdf</AttachmentTitle>
            <AttachmentDescription>2,4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction ref={focusNewAction} icon={<X />} aria-label="Quitar informe" onClick={toggleAttachment} />
          </AttachmentActions>
        </Attachment>
      ) : (
        <Button ref={focusNewAction} variant="outline" onClick={toggleAttachment}>Restaurar archivo</Button>
      )}
    </div>
  );
}
