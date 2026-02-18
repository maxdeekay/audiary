using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RenameFavouriteSongToTrack : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FavouriteSongs");

            migrationBuilder.CreateTable(
                name: "FavouriteTracks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TrackId = table.Column<int>(type: "integer", nullable: false),
                    CollectionAlbumId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavouriteTracks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FavouriteTracks_CollectionAlbums_CollectionAlbumId",
                        column: x => x.CollectionAlbumId,
                        principalTable: "CollectionAlbums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FavouriteTracks_Tracks_TrackId",
                        column: x => x.TrackId,
                        principalTable: "Tracks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FavouriteTracks_CollectionAlbumId",
                table: "FavouriteTracks",
                column: "CollectionAlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_FavouriteTracks_TrackId",
                table: "FavouriteTracks",
                column: "TrackId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FavouriteTracks");

            migrationBuilder.CreateTable(
                name: "FavouriteSongs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CollectionAlbumId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Position = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavouriteSongs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FavouriteSongs_CollectionAlbums_CollectionAlbumId",
                        column: x => x.CollectionAlbumId,
                        principalTable: "CollectionAlbums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FavouriteSongs_CollectionAlbumId",
                table: "FavouriteSongs",
                column: "CollectionAlbumId");
        }
    }
}
