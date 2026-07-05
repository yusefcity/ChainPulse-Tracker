// ChainPulse Tracker - TypeScript Simulation
// Single-file implementation using standard TypeScript only

type TxType = "TRANSFER" | "REWARD";

interface BlockTransaction {
    id: number;
    from: string;
    to: string;
    amount: number;
    type: TxType;
    timestamp: Date;
}

class Ledger {
    private chain: BlockTransaction[] = [];
    private balances: Map<string, number> = new Map();

    constructor() {
        // Initialize system accounts
        this.balances.set("Alice", 100);
        this.balances.set("Bob", 50);
        this.balances.set("Miner", 0);
    }

    private updateBalance(user: string, amount: number): void {
        const current = this.balances.get(user) || 0;
        this.balances.set(user, current + amount);
    }

    createTransaction(from: string, to: string, amount: number, type: TxType): void {
        const senderBalance = this.balances.get(from) || 0;

        if (type === "TRANSFER" && senderBalance < amount) {
            console.log(`Transaction failed: ${from} has insufficient funds`);
            return;
        }

        if (type === "TRANSFER") {
            this.updateBalance(from, -amount);
            this.updateBalance(to, amount);
        }

        if (type === "REWARD") {
            this.updateBalance(to, amount);
        }

        const tx: BlockTransaction = {
            id: this.chain.length + 1,
            from,
            to,
            amount,
            type,
            timestamp: new Date()
        };

        this.chain.push(tx);
    }

    printChain(): void {
        console.log("\n--- Blockchain Ledger ---");
        this.chain.forEach(block => {
            console.log(
                `[${block.id}] ${block.type} | ${block.from} -> ${block.to} | ${block.amount} | ${block.timestamp.toISOString()}`
            );
        });
    }

    printBalances(): void {
        console.log("\n--- Account Balances ---");
        this.balances.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
    }
}

class ChainPulseApp {
    private ledger: Ledger;

    }
}

// Execute application
const app = new ChainPulseApp();
app.run();
