/**
 * Utility functions for formatting workspace names with visibility and collaboration indicators
 */

export class WorkspaceNameUtility {
  /**
   * Format a workspace name with emoji indicators
   * - 🔒 (lock) if the workspace does not allow public visibility
   * - 🔛 (ON!) if the workspace allows collaboration
   *
   * @param workspace - The workspace object
   * @returns Formatted workspace name with emojis
   */
  static formatWorkspaceNameWithEmojis(workspace: any): string {
    if (!workspace) return '';

    const baseName = workspace.metadata?.source || workspace.metadata?.event_name || workspace.source || workspace.event_name || workspace.name || workspace.id || '';
    let suffix = '';

    // Add lock emoji if workspace does not allow public visibility
    if (workspace.public === false) {
      suffix += ' 🔒';
    }

    // Add "on" emoji if workspace allows collaboration
    if (workspace.collaborate === true) {
      suffix += ' 🔛';
    }

    return baseName + suffix;
  }

  /**
   * Get just the base name without emojis
   * @param workspace - The workspace object
   * @returns Base workspace name
   */
  static getBaseName(workspace: any): string {
    if (!workspace) return '';
    return workspace.metadata?.source || workspace.metadata?.event_name || workspace.source || workspace.event_name || workspace.name || workspace.id || '';
  }

  /**
   * Get emoji suffix based on workspace settings
   * @param workspace - The workspace object
   * @returns Emoji suffix (may be empty string)
   */
  static getEmojiSuffix(workspace: any): string {
    let suffix = '';
    if (workspace.public === false) {
      suffix += ' 🔒';
    }
    if (workspace.collaborate === true) {
      suffix += ' 🔛';
    }
    return suffix;
  }
}
