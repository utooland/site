"use client";

import "../workerHack";

import { Hammer, FolderTree, Code2, Eye, Globe, Cloud, Cpu } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useBuild } from "../hooks/useBuild";
import { useFileContent } from "../hooks/useFileContent";
import { useFileTree } from "../hooks/useFileTree";
import { useUtooProject } from "../hooks/useUtooProject";
import { Editor } from "./Editor";
import { FileTreeItem } from "./FileTree";
import { Preview } from "./Preview";
import { useI18n } from "../i18n/context";

export function Playground() {
  const { t } = useI18n();
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
      <section id="playground" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-[600px] bg-card rounded-xl border border-border">
            <div className="text-center p-8">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                Initialization Failed
              </h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="playground" className="py-20 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="font-mono text-orange-400">@utoo/web</span>{" "}
              <span className="text-muted-foreground">{t.playground.title}</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {t.playground.description}
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <Cloud className="w-4 h-4 text-orange-400" />
              <span>{t.playground.features.isomorphicInstall}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <Cpu className="w-4 h-4 text-orange-400" />
              <span>{t.playground.features.wasmCompiler}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <FolderTree className="w-4 h-4 text-orange-400" />
              <span>{t.playground.features.opfsFileSystem}</span>
            </div>
          </div>
        </motion.div>

        {/* Build button */}
        <div className="flex justify-center mb-4">
          <Button
            onClick={handleBuild}
            disabled={isLoading || isBuilding || !project}
            className="btn-glow bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0"
          >
            <Hammer className="w-4 h-4 mr-2" />
            {isBuilding ? t.playground.building : t.playground.buildButton}
          </Button>
        </div>

        {buildError && (
          <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center max-w-2xl mx-auto">
            {buildError}
          </div>
        )}

        {/* Playground container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="playground-container playground-dark"
        >
          {/* File Tree Panel */}
          <div className="panel">
            <div className="panel-header">
              <FolderTree className="w-4 h-4" />
              {t.playground.panels.projectFiles}
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
              {t.playground.panels.editor}
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
              {t.playground.panels.preview}
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
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-xl glass">
            <div className="text-2xl font-bold text-orange-400 mb-2">1</div>
            <h4 className="font-semibold mb-2">{t.playground.steps.step1.title}</h4>
            <p className="text-sm text-muted-foreground">
              {t.playground.steps.step1.description}
            </p>
          </div>
          <div className="p-6 rounded-xl glass">
            <div className="text-2xl font-bold text-orange-400 mb-2">2</div>
            <h4 className="font-semibold mb-2">{t.playground.steps.step2.title}</h4>
            <p className="text-sm text-muted-foreground">
              {t.playground.steps.step2.description}
            </p>
          </div>
          <div className="p-6 rounded-xl glass">
            <div className="text-2xl font-bold text-orange-400 mb-2">3</div>
            <h4 className="font-semibold mb-2">{t.playground.steps.step3.title}</h4>
            <p className="text-sm text-muted-foreground">
              {t.playground.steps.step3.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
