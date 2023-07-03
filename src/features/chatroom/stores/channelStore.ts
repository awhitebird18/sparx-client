import { makeObservable, observable, action } from "mobx";

interface Channel {
  id: string;
  content: string;
}

interface UpdateChannel {
  id: string;
  content: string;
}

export class ChannelStore {
  id: string | null = null;
  channel: Channel | null = null;

  constructor() {
    makeObservable(this, {
      id: observable,
      channel: observable,
      getChannel: action,
      updateChannel: action,
    });
  }

  getChannel() {
    return this.channel;
  }

  updateChannel(updatedFields: UpdateChannel) {
    if (this.channel && this.channel.id === updatedFields.id) {
      this.channel = { ...this.channel, ...updatedFields };
    } else {
      console.log("Channel not found or ids do not match");
    }
  }

  async fetchChannel(id: string) {
    try {
      const response = await fetch(`channel/${id}`);
      const data = await response.json();
      this.channel = data;
    } catch (error) {
      console.error("Error fetching channel:", error);
    }
  }
}
