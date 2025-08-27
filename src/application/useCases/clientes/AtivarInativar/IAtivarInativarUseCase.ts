export interface IAtivarInativarUseCase {
    execute(id: string): Promise<void>
}