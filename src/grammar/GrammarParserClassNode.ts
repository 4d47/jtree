import TreeNode from "../base/TreeNode"
import TreeUtils from "../base/TreeUtils"

import GrammarBackedNonTerminalNode from "./GrammarBackedNonTerminalNode"
import GrammarBackedAnyNode from "./GrammarBackedAnyNode"
import GrammarBackedTerminalNode from "./GrammarBackedTerminalNode"
import GrammarBackedErrorNode from "./GrammarBackedErrorNode"

class GrammarParserClassNode extends TreeNode {
  getParserClassFilePath() {
    return this.getWord(2)
  }

  getSubModuleName() {
    return this.getWord(3)
  }

  _getNodeClasses() {
    const builtIns = {
      ErrorNode: GrammarBackedErrorNode,
      TerminalNode: GrammarBackedTerminalNode,
      NonTerminalNode: GrammarBackedNonTerminalNode,
      AnyNode: GrammarBackedAnyNode
    }

    return builtIns
  }

  getParserClass() {
    const filepath = this.getParserClassFilePath()
    const builtIns = this._getNodeClasses()
    const builtIn = builtIns[filepath]

    if (builtIn) return builtIn

    const rootPath = this.getRootNode().getTheGrammarFilePath()

    const basePath = TreeUtils.getPathWithoutFileName(rootPath) + "/"
    const fullPath = filepath.startsWith("/") ? filepath : basePath + filepath

    // todo: remove "window" below?
    if (!this.isNodeJs()) {
      const cls = window[TreeUtils.getClassNameFromFilePath(filepath)]
      if (!cls) console.error(`WARNING: class ${filepath} not found.`)
      return cls
    }

    const theModule = require(fullPath)
    const subModule = this.getSubModuleName()
    return subModule ? theModule[subModule] : theModule
  }
}

export default GrammarParserClassNode