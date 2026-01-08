"use client";

import "../workerHack";

import { Hammer, FolderTree, Code2, Eye } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useBuild } from "../hooks/useBuild";
import { useFileContent } from "../hooks/useFileContent";
import { useFileTree } from "../hooks/useFileTree";
import { useUtooProject } from "../hooks/useUtooProject";
import { Editor } from "./Editor";
import { FileTreeItem } from "./FileTree";
import { Preview } from "./Preview";

export function Playground() {
  const { project, isLoading, error, initProgress, initMessage, initTime } =
    useUtooProject();
  const { fileTree, handleDirectoryExpand } = useFileTree(project);
  const {
    openFiles,
    openFile,
    closeFile,
    selectedFilePath,
    selectedFileContent,
    fileState,
    setSelectedFileContent,
    manualSaveFile,
    previewUrl,
    setPreviewUrl,
  } = useFileContent(project);

  const previewRef = useRef<{ reload: () => void }>(null);

  const {
    isBuilding,
    handleBuild,
    buildProgress,
    buildMessage,
    buildTime,
    error: buildError,
  } = useBuild(
    project,
    fileTree,
    handleDirectoryExpand,
    () => previewRef.current?.reload(),
    setPreviewUrl,
  );

  const handleFileClick = async (filePath: string) => {
    await openFile(filePath);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-card rounded-xl border border-border">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-400 mb-2">
            Initialization Failed
          </h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section id="playground" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try <span className="gradient-text">Utoo</span> Now
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the power of Utoo directly in your browser. Edit code,
            build, and see the results instantly.
          </p>
        </div>

        {/* Build button */}
        <div className="flex justify-center mb-4">
          <Button
            onClick={handleBuild}
            disabled={isLoading || isBuilding || !project}
            className="btn-glow bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
          >
            <Hammer className="w-4 h-4 mr-2" />
            {isBuilding ? "Building..." : "Build Project"}
          </Button>
        </div>

        {buildError && (
          <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {buildError}
          </div>
        )}

        {/* Playground container */}
        <div className="playground-container glass border-white/10">
          {/* File Tree Panel */}
          <div className="panel">
            <div className="panel-header">
              <FolderTree className="w-4 h-4" />
              Project Files
            </div>
            <div className="panel-content overflow-auto">
              <ul role="tree" className="py-2">
                {fileTree.map((item) => (
                  <FileTreeItem
                    key={item.fullName}
                    item={item}
                    onFileClick={handleFileClick}
                    onDirectoryExpand={handleDirectoryExpand}
                    selectedFile={selectedFilePath}
                  />
                ))}
              </ul>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="panel">
            <div className="panel-header">
              <Code2 className="w-4 h-4" />
              Editor
            </div>
            <div className="panel-content">
              {project && (
                <Editor
                  openFiles={openFiles}
                  activeFile={selectedFilePath}
                  content={selectedFileContent}
                  isDirty={fileState.isDirty}
                  isSaving={fileState.isSaving}
                  onContentChange={setSelectedFileContent}
                  onSwitchFile={openFile}
                  onCloseFile={closeFile}
                  onSave={manualSaveFile}
                  project={project}
                />
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="panel">
            <div className="panel-header">
              <Eye className="w-4 h-4" />
              Preview
            </div>
            <div className="panel-content">
              <Preview
                ref={previewRef}
                url={previewUrl}
                isLoading={isLoading}
                isBuilding={isBuilding}
                initProgress={initProgress}
                initMessage={initMessage}
                initTime={initTime}
                buildProgress={buildProgress}
                buildMessage={buildMessage}
                buildTime={buildTime}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
