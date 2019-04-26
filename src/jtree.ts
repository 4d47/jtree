import TreeUtils from "./base/TreeUtils"
import TreeNode from "./base/TreeNode"

import AbstractRuntimeProgram from "./grammar/AbstractRuntimeProgram"
import GrammarBackedNonTerminalNode from "./grammar/GrammarBackedNonTerminalNode"
import GrammarBackedTerminalNode from "./grammar/GrammarBackedTerminalNode"
import GrammarBackedAnyNode from "./grammar/GrammarBackedAnyNode"
import GrammarProgram from "./grammar/GrammarProgram"
import TreeNotationCodeMirrorMode from "./grammar/TreeNotationCodeMirrorMode"

class jtree {
  static program = AbstractRuntimeProgram
  static Utils = TreeUtils
  static TreeNode = TreeNode
  static NonTerminalNode = GrammarBackedNonTerminalNode
  static TerminalNode = GrammarBackedTerminalNode
  static AnyNode = GrammarBackedAnyNode
  static GrammarProgram = GrammarProgram
  static TreeNotationCodeMirrorMode = TreeNotationCodeMirrorMode
  static getLanguage = name => require(__dirname + `/../langs/${name}/index.js`)
  static getVersion = () => "19.5.1"
}

export default jtree
